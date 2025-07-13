# 🚀 Deployment Guide

## GitHub Pages Deployment

### Option 1: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create a new repository** on GitHub named `smit-portfolio-modern`

3. **Push the code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern React Portfolio"
   git branch -M main
   git remote add origin https://github.com/smit53/smit-portfolio-modern.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Click Save

5. **Your site will be available at**: `https://smit53.github.io/smit-portfolio-modern/`

### Option 2: GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Update GitHub Pages settings** to use `gh-pages` branch

## Netlify Deployment

1. **Connect your GitHub repository** to Netlify
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy automatically** on every push

## Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** and your site will be live!

## Custom Domain

1. **Purchase a domain** (Namecheap, GoDaddy, etc.)
2. **Add CNAME record** pointing to your GitHub Pages URL
3. **Update GitHub Pages settings** with your custom domain

## Performance Optimization

### Build Optimization
- ✅ Code splitting with React.lazy()
- ✅ Tree shaking enabled
- ✅ Minified production build
- ✅ Optimized images

### Runtime Optimization
- ✅ Lazy loading components
- ✅ Intersection Observer for animations
- ✅ Debounced scroll events
- ✅ Efficient re-renders

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Animations not working**
   - Ensure Framer Motion is installed
   - Check browser compatibility
   - Verify CSS is loading

3. **Styling issues**
   - Clear browser cache
   - Check Tailwind CSS configuration
   - Verify PostCSS setup

### Performance Issues

1. **Slow loading**
   - Optimize images
   - Enable gzip compression
   - Use CDN for assets

2. **Animation lag**
   - Reduce particle count
   - Use transform instead of position
   - Enable hardware acceleration

## Support

For issues or questions:
- Check the README.md
- Review the code comments
- Open an issue on GitHub 