
<img width="931" height="700" alt="Screenshot 2025-09-30 at 5 47 04 PM" src="https://github.com/user-attachments/assets/5553188a-9e15-4c9c-b83c-421788f7fcc8" /><img width="931" height="700" alt="Screenshot 2025-09-30 at 5 47 40 PM" src="https://github.com/user-attachments/assets/51dfd98e-28fb-407f-a12b-a80fb103c4b7" />



**URL**: https://lovable.dev/projects/172d28cc-af0f-4578-9566-072affa1ffff

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/172d28cc-af0f-4578-9566-072affa1ffff) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy with Lovable (Easiest)

Simply open [Lovable](https://lovable.dev/projects/172d28cc-af0f-4578-9566-072affa1ffff) and click on Share -> Publish.

### Deploy to GitHub Pages

1. **Build your project:**
   ```sh
   npm run build
   ```

2. **Configure GitHub Pages:**
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   
3. **Create GitHub Actions workflow:**
   Create `.github/workflows/deploy.yml` with:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: ['main']
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v4
           id: deployment
   ```

4. **Push to GitHub** - Your site will automatically deploy!

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
