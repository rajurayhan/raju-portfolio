/**
 * HTML notification for portfolio contact form — colors & tone match `portfolio.css` (light theme).
 * All user fields are escaped for safe use inside HTML email.
 */

const SITE = 'https://rajurayhan.com';

const COLORS = {
  paper: '#f2ece1',
  paper2: '#ebe4d5',
  ink: '#1a1612',
  inkSoft: '#3a3228',
  rule: '#d6ccb8',
  accent: '#c96442',
  muted: '#8a7e6e',
} as const;

const ENGAGEMENT_LABEL: Record<string, string> = {
  fractional: 'Fractional Head of Eng',
  advisory: 'Architecture advisory',
  build: 'Project build',
  review: 'Platform / code review',
  other: 'Something else',
};

const BUDGET_LABEL: Record<string, string> = {
  'not-sure': 'Not sure yet',
  'under-10k': 'Under $10k',
  '10-25k': '$10k — $25k / mo',
  '25k-plus': '$25k+ / mo',
  retainer: 'Ongoing retainer',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function nlToBr(s: string): string {
  return escapeHtml(s).replace(/\r\n/g, '\n').replace(/\n/g, '<br />');
}

function labelEngagement(v: string): string {
  return ENGAGEMENT_LABEL[v] || v;
}

function labelBudget(v: string): string {
  return BUDGET_LABEL[v] || v;
}

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  budget: string;
  engagement: string;
  message: string;
};

export function buildContactEmailHtml(fields: ContactFields): string {
  const name = escapeHtml(fields.name);
  const email = escapeHtml(fields.email);
  const emailHref = escapeAttr(fields.email);
  const company = fields.company ? escapeHtml(fields.company) : '';
  const eng = escapeHtml(labelEngagement(fields.engagement));
  const bud = escapeHtml(labelBudget(fields.budget));
  const messageHtml = nlToBr(fields.message);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New portfolio message</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.paper2};-webkit-text-size-adjust:100%;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${COLORS.paper2};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;border:1px solid ${COLORS.rule};background-color:${COLORS.paper};border-radius:0;">
            <tr>
              <td style="padding:20px 24px 12px 24px;border-bottom:1px solid ${COLORS.rule};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="font-family:ui-monospace,Menlo,Monaco,'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.accent};margin:0 0 6px 0;">// portfolio · new engagement</div>
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-style:italic;font-weight:400;color:${COLORS.ink};line-height:1.1;margin:0;">Raju Rayhan</div>
                    </td>
                    <td align="right" style="vertical-align:top;padding-top:2px;">
                      <a href="${SITE}" style="font-family:ui-monospace,Menlo,Monaco,monospace;font-size:10px;color:${COLORS.muted};text-decoration:underline;">rajurayhan.com</a>
                    </td>
                  </tr>
                </table>
                <div style="height:3px;background-color:${COLORS.accent};margin-top:16px;opacity:0.85;border-radius:1px;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 8px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-family:ui-monospace,Menlo,Monaco,monospace;font-size:12px;color:${COLORS.ink};line-height:1.5;">
                  <tr>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.muted};width:32%;font-size:10.5px;letter-spacing:0.04em;">Name</td>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.ink};">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.muted};font-size:10.5px;letter-spacing:0.04em;">Email</td>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};"><a href="mailto:${emailHref}" style="color:${COLORS.accent};text-decoration:underline;">${email}</a></td>
                  </tr>
                  ${
                    company
                      ? `<tr>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.muted};font-size:10.5px;letter-spacing:0.04em;">Company</td>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.ink};">${company}</td>
                  </tr>`
                      : ''
                  }
                  <tr>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.muted};font-size:10.5px;letter-spacing:0.04em;">Engagement</td>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.ink};">${eng}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.muted};font-size:10.5px;letter-spacing:0.04em;">Budget</td>
                    <td style="padding:6px 0;border-bottom:1px solid ${COLORS.rule};color:${COLORS.ink};">${bud}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 20px 24px;">
                <div style="font-family:ui-monospace,Menlo,Monaco,monospace;font-size:10.5px;color:${COLORS.muted};letter-spacing:0.06em;margin:0 0 8px 0;">The situation</div>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:${COLORS.inkSoft};line-height:1.55;padding:16px 18px;background-color:${COLORS.paper2};border:1px solid ${COLORS.rule};border-left:3px solid ${COLORS.accent};">${messageHtml}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 24px 20px 24px;border-top:1px solid ${COLORS.rule};">
                <p style="font-family:ui-monospace,Menlo,Monaco,monospace;font-size:10px;color:${COLORS.muted};margin:0;line-height:1.5;">Reply to this address is wired to the sender (Reply-To).<br />
                <span style="color:${COLORS.accent};">// end</span> · contact form · TLS · Resend</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
