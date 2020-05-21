
# Configure Finder
echo "Finder configuration..."
defaults write com.apple.finder AppleShowAllFiles -bool yes
defaults write com.apple.finder _FXSortFoldersFirst -bool yes

killall Finder

# Configure Dock
echo "Autohide dock..."
defaults write com.apple.Dock autohide -bool no
defaults write com.apple.Dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.5
defaults write com.apple.dock autohide-fullscreen-delayed -bool false

killall Dock

echo "Mute startup sound..."
sudo nvram StartupMute=%01
