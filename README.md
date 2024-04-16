## Kakizu

Kakizu is an app which allows you to turn your scribbles and sketches to beautiful AI generated artworks. It utilises Clouflare worker AI models to generate the artwork from any given sketch.

## Running locally

1. Create a cloudflare account, head over to AI tab and get your AI token, I'm using their REST endpoints in my project, so you will also need to get that from the code example. You will also need to create a cloudinary account to store the images.

2. Clone the repository and install the dependencies

```bash
git clone https://github.com/asrvd/kakizu

cd kakizu

pnpm i
```

3. Create a `.env` file in the root of the project and add the following

```bash
CLOUDFLARE_AI_TOKEN=your_cloudflare_ai_token
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset # needed for image storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
DATABASE_URL=your_database_url # for saving user data
AUTH_GITHUB_ID=your_github_oauth_app_id
AUTH_GITHUB_SECRET=your_github_oauth_app_secret
AUTH_SECRET=random_base64_string
```

4. Start the development server

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

