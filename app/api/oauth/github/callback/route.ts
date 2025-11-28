import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
        return new Response(`GitHub OAuth error: ${error}`, {status: 400});
    }

    if (!code) {
        return new Response("Missing ?code in callback URL", {status: 400});
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        return new Response("Missing GitHub OAuth environment variables in callback", {status: 500});
    }

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST", headers: {
            Accept: "application/json", "Content-Type": "application/json",
        }, body: JSON.stringify({
            client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri,
        }),
    });

    const tokenJson = await tokenResponse.json();

    if (!tokenResponse.ok || tokenJson.error || !tokenJson.access_token) {
        console.error("Token exchange failed:", tokenJson);
        return new Response("Failed to exchange code for access token", {
            status: 500,
        });
    }

    const accessToken = tokenJson.access_token as string;

    const userResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "cs391-oauth-demo",
        },
    });

    const user = await userResponse.json();

    const emailsResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "cs391-oauth-demo",
        },
    });

    const emails = await emailsResponse.json();
    let primaryEmail: string | null = null;

    if (Array.isArray(emails) && emails.length > 0) {
        const primary = emails.find((e: any) => e.primary) ?? emails[0];
        primaryEmail = primary?.email ?? null;
    }

    const params = new URLSearchParams({
        login: user.login ?? "",
        name: user.name ?? "",
        avatar_url: user.avatar_url ?? "",
        primary_email: primaryEmail ?? "",
    });

    return Response.redirect(`https://mp-6-two-navy.vercel.app/profile?${params.toString()}`, 302);

}
