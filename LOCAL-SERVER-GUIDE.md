# How to Run GSSS Budhwali Website with Sanity CMS

## 🔴 **The Problem**

You opened `index.html` directly in your browser (`file:///C:/...`), which causes a **CORS security error**. 

Sanity's API blocks requests from `file://` URLs for security reasons.

---

## ✅ **The Solution: Run a Local Web Server**

You have **3 easy options**:

---

### **Option 1: Using Python (Recommended - Easiest!)** 🐍

**If you have Python installed:**

1. Open PowerShell in your project folder:
   ```bash
   cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali
   ```

2. Run this command:
   ```bash
   # For Python 3
   python -m http.server 8000
   
   # OR for Python 2
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

4. **Your Sanity content will now load!** ✅

---

### **Option 2: Using Node.js http-server** 📦

**If you have Node.js installed:**

1. Install http-server globally:
   ```bash
   npm install -g http-server
   ```

2. Navigate to your project folder:
   ```bash
   cd C:\Users\dks89\.gemini\antigravity\scratch\gsss-budhwali
   ```

3. Start the server:
   ```bash
   http-server -p 8000
   ```

4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

---

### **Option 3: Using VS Code Live Server** 💻

**If you use VS Code:**

1. Open VS Code
2. Install the **"Live Server"** extension by Ritwick Dey
3. Open your project folder in VS Code
4. Right-click on `index.html`
5. Click **"Open with Live Server"**
6. Browser opens automatically at `http://127.0.0.1:5500`

---

## 🔐 **Add CORS Origin to Sanity (Required!)**

After starting the server, you need to tell Sanity which URL is allowed:

1. Go to: **https://www.sanity.io/manage**
2. Click on your project: **"gsss-budhwali"**
3. Go to **Settings** → **API** tab
4. Scroll to **"CORS origins"** section
5. Click **"Add CORS origin"**
6. Enter one of these (depending on which server you used):
   ```
   http://localhost:8000
   OR
   http://127.0.0.1:5500
   ```
7. Check ✅ **"Allow credentials"**
8. Click **"Save"**

---

## ✅ **Verify It Works**

1. Open your website through the local server (e.g., `http://localhost:8000`)
2. Open browser console (F12 → Console tab)
3. You should see:
   - ✅ No CORS errors
   - ✅ "Faculty fetched successfully" or similar messages
4. Scroll to **"Our Faculty"** section
5. **You should see your faculty member from Sanity!** 🎉

---

## 🚀 **For Deployment (Later)**

When you deploy to a real hosting service:

1. Add your production URL to CORS origins (e.g., `https://gsss-budhwali.com`)
2. No more local server needed!
3. Website will work normally

---

## 🆘 **Quick Troubleshooting**

### **Problem**: "python is not recognized"
**Solution**: Python isn't installed. Use Option 2 (Node.js) or Option 3 (VS Code) instead.

### **Problem**: Still showing static content
**Solution**: 
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh the page (Ctrl+F5)
3. Check browser console for errors
4. Verify CORS origin was added in Sanity

### **Problem**: CORS error still appears
**Solution**:
1. Make sure you added the correct URL to Sanity CORS origins
2. The URL in browser must EXACTLY match the CORS origin
3. Example: If using `http://localhost:8000`, don't go to `http://127.0.0.1:8000`

---

## 📝 **Summary**

1. ✅ Your Sanity setup is correct!
2. ✅ Your `sanity.js` integration is working!
3. ❌ Just need to run through a server instead of opening files directly
4. ✅ Add CORS origin in Sanity
5. 🎉 Everything will work!

---

**Pick one of the 3 options above and try it!**
