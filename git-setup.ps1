# Initialize git
git init

# Add all files (respecting .gitignore)
git add .

# Set placeholder email/name if not configured globally
git config --local user.email "intern@smartbridge.com"
git config --local user.name "MERN Intern"

# Commit changes
git commit -m "Initial commit - Nutrition Assistant MERN Stack App"

# Create main branch and remote
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/tejesh143r/Nutri-Assist.git

Write-Output "Git repository initialized and committed locally!"
