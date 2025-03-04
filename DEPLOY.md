# Deploying Your Vinyl Collection App to GitHub Pages

To create a fully rendered example on GitHub Pages, follow these steps:

## Method 1: Manual Deployment

1. Install gh-pages package if not already installed:
   ```
   npm install --save-dev gh-pages
   ```

2. Run the build command:
   ```
   npm run build
   ```

3. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Method 2: GitHub Actions Automated Deployment

1. Create a `.github/workflows` directory in your repository root
2. Create a file named `deploy.yml` in that directory with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Node.js 🔧
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies 📦
        run: npm ci

      - name: Build 🏗️
        run: npm run build

      - name: Deploy to GitHub Pages 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build # The folder the action should deploy
          branch: gh-pages # The branch the action should deploy to
```

3. Commit and push this file to your repository
4. Go to your repository on GitHub → Settings → Pages
5. Under "Source", select "Deploy from a branch"
6. In the "Branch" dropdown, select "gh-pages" and folder "/ (root)"
7. Click "Save"

Your site will be available at: https://upjectory.github.io/vinyl-collection-app/

## Troubleshooting

If you encounter issues with GitHub Pages deployment:

1. Check that your repository has a `gh-pages` branch
2. Ensure that GitHub Pages is enabled in repository settings
3. Verify that the "homepage" field in your package.json matches your GitHub Pages URL
4. Check GitHub Actions logs for any build errors

## Testing Locally

Before deploying, you can test your build locally:

```
npm run build
npx serve -s build
```

This will serve your production build on http://localhost:3000 for testing.