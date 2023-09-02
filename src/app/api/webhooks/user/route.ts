/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */

import { prisma } from "@/server/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import type { WebhookRequiredHeaders } from "svix";
import type { IncomingHttpHeaders } from "http";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

const webhookSecret = process.env.VERCEL_WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload: JSON = await request.json();
  const headersList: ReadonlyHeaders = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({ err }, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, emailAddresses, publicMetadata, ...attributes } = evt.data;
    const res = await prisma.user.create({
      data: {
        clerkId: id as string,
        attributes: attributes,
        email: emailAddresses[0].emailAddress as string,
        role: publicMetadata.role as string,
        firstName: first_name as string,
        lastName: last_name as string,
      },
    });

    console.log(res);
  }

  return NextResponse.json({}, { status: 200 });
}

type EventType = "user.created" | "user.updated" | "*";
type T = any;
type Event = {
  data: any;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
