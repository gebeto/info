
# Configure Finder
defaults write com.apple.finder AppleShowAllFiles -bool yes
defaults write com.apple.finder _FXSortFoldersFirst -bool yes

killall Finder

# Configure Dock
defaults write com.apple.Dock autohide -bool yes
defaults write com.apple.Dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.5
defaults write com.apple.dock autohide-fullscreen-delayed -bool false

killall Dock
