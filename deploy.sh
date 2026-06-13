#!/data/data/com.termux/files/usr/bin/bash

echo "🚀 Starting SwiftPay Auto Deploy..."

cd ~/swiftpay

git init
git add .
git commit -m "SwiftPay auto deploy v5" || echo "No changes"

# IMPORTANT: you must set your GitHub repo once
git push -u origin main

echo "✅ Pushed to GitHub"
echo "🌍 Render will auto-deploy your latest version"
