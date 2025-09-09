# 🚀 Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended) - Full-Stack Deployment

**Step 1: Prepare Your Repository**
1. Create a GitHub repository
2. Upload your `music-app` folder
3. Make sure your API keys are NOT in the code

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will detect Next.js automatically

**Step 3: Set Environment Variables**
In Vercel dashboard → Settings → Environment Variables, add:
```
ACRCLOUD_HOST=your_acrcloud_host
ACRCLOUD_ACCESS_KEY=your_acrcloud_key
ACRCLOUD_ACCESS_SECRET=your_acrcloud_secret
LASTFM_CLIENT_ID=your_lastfm_key
LASTFM_CLIENT_SECRET=your_lastfm_secret
```

**Step 4: Deploy**
- Vercel will automatically build and deploy
- You'll get a live URL like: `https://your-app.vercel.app`

---

### Option 2: Railway (Alternative Full-Stack)

**Step 1: Deploy Backend**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy the `backend` folder
4. Add environment variables
5. Get your API URL

**Step 2: Deploy Frontend**
1. Update API endpoints in frontend to use Railway URL
2. Deploy frontend to Vercel/Netlify

---

### Option 3: Separate Hosting

**Backend Options:**
- **Render**: Free tier, easy Python deployment
- **Heroku**: Popular, simple setup
- **DigitalOcean App Platform**: $5/month, reliable

**Frontend Options:**
- **Netlify**: Free tier, automatic builds
- **Vercel**: Best for Next.js
- **GitHub Pages**: Free but static only

---

## Environment Variables Setup

Create these accounts and get API keys:

### ACRCloud (Music Recognition)
1. Go to [acrcloud.com](https://www.acrcloud.com)
2. Sign up for free account
3. Create a project
4. Get: Host, Access Key, Access Secret

### Last.fm (Recommendations)
1. Go to [last.fm/api](https://www.last.fm/api)
2. Create API account
3. Get: API Key, Shared Secret

---

## Quick Deploy Commands

### For Vercel CLI:
```bash
npm i -g vercel
cd music-app
vercel
```

### For Railway CLI:
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

---

## Post-Deployment Checklist

✅ **Test all features:**
- Audio file upload
- YouTube URL recognition
- Song recommendations
- Error handling

✅ **Security:**
- Environment variables set
- API keys not in code
- CORS properly configured

✅ **Performance:**
- Check loading times
- Test on mobile devices
- Verify all buttons work

---

## Troubleshooting

**Common Issues:**

1. **API Keys Not Working**
   - Double-check environment variables
   - Ensure no extra spaces in keys

2. **CORS Errors**
   - Update CORS origins in backend
   - Use relative URLs in frontend

3. **Build Failures**
   - Check all dependencies installed
   - Verify file paths are correct

4. **YouTube Downloads Failing**
   - Some hosts block yt-dlp
   - Consider using a different service

---

## Cost Estimate

**Free Tier (Recommended Start):**
- Vercel: Free for hobby projects
- ACRCloud: 3,000 requests/month free
- Last.fm: Free API access

**Paid Tier (If You Get Popular):**
- Vercel Pro: $20/month
- ACRCloud Standard: $50/month for 100K requests
- Railway: $5/month for backend

---

Your app is ready to go live! 🎵🚀
