#!/usr/bin/env bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

echo -e "${BOLD}===================================================${NC}"
echo -e "${BOLD}  Fastasys Developer Environment Check & Setup      ${NC}"
echo -e "${BOLD}===================================================${NC}\n"

# Helper print functions
print_success() { echo -e " [${GREEN}✓${NC}] $1"; }
print_fail()    { echo -e " [${RED}✗${NC}] $1"; ((ERRORS++)); }
print_warn()    { echo -e " [${YELLOW}!${NC}] $1"; ((WARNINGS++)); }
print_info()    { echo -e " [${BLUE}i${NC}] $1"; }

# -------------------------------------------------------------------
# 1. Check .NET SDK
# -------------------------------------------------------------------
echo -e "${BOLD}1. Checking .NET SDK...${NC}"
if command -v dotnet >/dev/null 2>&1; then
    DOTNET_VER=$(dotnet --version 2>/dev/null || echo "Unknown")
    print_success ".NET CLI is installed (Active version: ${DOTNET_VER})"

    # Check for .NET 10 SDK
    SDKS=$(dotnet --list-sdks 2>/dev/null)
    if echo "$SDKS" | grep -q "^10\."; then
        print_success ".NET 10 SDK is installed"
    else
        print_warn ".NET 10 SDK not detected in 'dotnet --list-sdks'. Target framework is net10.0."
        echo -e "     ${YELLOW}Installed SDKs:${NC}"
        echo "$SDKS" | sed 's/^/     /'
        echo -e "     ${YELLOW}To install .NET 10 SDK on macOS:${NC} brew install --cask dotnet-sdk"
    fi
else
    print_fail ".NET CLI ('dotnet') is not installed or not in your PATH."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "     ${YELLOW}Install via Homebrew:${NC} brew install --cask dotnet-sdk"
    fi
    echo -e "     ${YELLOW}Or download from:${NC} https://dotnet.microsoft.com/download"
fi
echo ""

# -------------------------------------------------------------------
# 2. Check Docker / OrbStack
# -------------------------------------------------------------------
echo -e "${BOLD}2. Checking Docker & Container Runtime...${NC}"
if command -v docker >/dev/null 2>&1; then
    print_success "Docker CLI is installed"

    if docker info >/dev/null 2>&1; then
        print_success "Docker daemon is running and responsive"

        # macOS specific checks for OrbStack vs Docker Desktop
        if [[ "$OSTYPE" == "darwin"* ]]; then
            if pgrep -f "OrbStack" >/dev/null 2>&1 || command -v orb >/dev/null 2>&1; then
                print_info "OrbStack detected on macOS"
            fi
        fi
    else
        print_fail "Docker daemon is NOT running. Please start Docker (OrbStack or Docker Desktop)."
    fi
else
    print_fail "Docker CLI ('docker') is not installed."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "     ${YELLOW}Install OrbStack (macOS):${NC} brew install --cask orbstack"
        echo -e "     ${YELLOW}Or Docker Desktop:${NC} brew install --cask docker"
    fi
fi
echo ""

# -------------------------------------------------------------------
# 3. Check Node.js & npm
# -------------------------------------------------------------------
echo -e "${BOLD}3. Checking Node.js & npm...${NC}"
if command -v node >/dev/null 2>&1; then
    NODE_VER=$(node --version)
    print_success "Node.js is installed (${NODE_VER})"
else
    print_fail "Node.js is not installed."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "     ${YELLOW}Install via Homebrew:${NC} brew install node"
    fi
fi

if command -v npm >/dev/null 2>&1; then
    NPM_VER=$(npm --version)
    print_success "npm is installed (v${NPM_VER})"
else
    print_fail "npm is not installed."
fi
echo ""

# -------------------------------------------------------------------
# 4. Check Frontend Dependencies (node_modules)
# -------------------------------------------------------------------
echo -e "${BOLD}4. Checking Frontend Dependencies...${NC}"
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/frontend"

if [ -d "$FRONTEND_DIR" ]; then
    if [ -d "$FRONTEND_DIR/node_modules" ]; then
        print_success "frontend/node_modules exists"
    else
        print_warn "frontend/node_modules not found. Installing dependencies via 'npm install'..."
        if command -v npm >/dev/null 2>&1; then
            (cd "$FRONTEND_DIR" && npm install)
            if [ $? -eq 0 ]; then
                print_success "npm install completed successfully!"
            else
                print_fail "npm install failed in frontend directory."
            fi
        else
            print_fail "Cannot install frontend dependencies because npm is missing."
        fi
    fi
else
    print_fail "Frontend directory not found at $FRONTEND_DIR"
fi
echo ""

# -------------------------------------------------------------------
# Summary
# -------------------------------------------------------------------
echo -e "${BOLD}===================================================${NC}"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}${BOLD} All checks passed! Your environment is ready to run Fastasys.${NC}"
    echo -e " Run the project with: ${BOLD}dotnet run --project Fastasys.AppHost${NC}"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}${BOLD} Checks completed with $WARNINGS warning(s). Please review recommendations above.${NC}"
else
    echo -e "${RED}${BOLD} Checks completed with $ERRORS error(s) and $WARNINGS warning(s).${NC}"
    echo -e " Please resolve missing prerequisites before running the app."
fi
echo -e "${BOLD}===================================================${NC}"

exit $ERRORS
