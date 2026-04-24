import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { buildContactEmailHtml } from '../../lib/contactEmailTemplate';

export const prerender = false;

type Body = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  engagement?: string;
  message?: string;
};

function getKey(locals: App.Locals): string | undefined {
  return locals.runtime?.env?.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
}

function getTo(locals: App.Locals): string {
  return (
    locals.runtime?.env?.CONTACT_TO_EMAIL ?? import.meta.env.CONTACT_TO_EMAIL ?? 'send2raju.bd@gmail.com'
  );
}

function getFrom(locals: App.Locals): string {
  return (
    locals.runtime?.env?.CONTACT_FROM_EMAIL ??
    import.meta.env.CONTACT_FROM_EMAIL ??
    'onboarding@resend.dev'
  );
}

export const POST: APIRoute = async ({ request, locals }) => {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }
  const name = (body.name || '').trim().slice(0, 200);
  const email = (body.email || '').trim().slice(0, 320);
  const company = (body.company || '').trim().slice(0, 200);
  const budget = (body.budget || '').trim().slice(0, 80);
  const engagement = (body.engagement || '').trim().slice(0, 80);
  const message = (body.message || '').trim().slice(0, 12000);
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), { status: 400 });
  }
  const key = getKey(locals);
  if (!key) {
    return new Response(JSON.stringify({ error: 'Server email is not configured.' }), { status: 500 });
  }
  const to = getTo(locals);
  const from = getFrom(locals);
  const resend = new Resend(key);
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    `Engagement: ${engagement}`,
    `Budget: ${budget}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');
  const html = buildContactEmailHtml({
    name,
    email,
    company,
    budget,
    engagement,
    message,
  });
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Portfolio · message from ${name}`,
    text,
    html,
  });
  if (error) {
    return new Response(JSON.stringify({ error: error.message || 'Resend error' }), { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
