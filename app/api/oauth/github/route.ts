import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        return new Response("Missing GitHub OAuth environment variables", {
            status: 500,
        });
    }

    const params = new URLSearchParams({
        client_id: clientId, redirect_uri: redirectUri, scope: "read:user user:email", allow_signup: "true",
    });

    const githubAuthorizeUrl = `https://github.com/login/oauth/authorize?` + params.toString();

    return Response.redirect(githubAuthorizeUrl, 302);
}
