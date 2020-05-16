
# Configure Finder
defaults write com.apple.finder AppleShowAllFiles -bool yes
defaults write com.apple.finder _FXSortFoldersFirst -bool yes

killall Finder

# Configure Dock
defaults write com.apple.Dock autohide -bool yes
defaults write com.apple.Dock autohide-delay -float 0

killall Dock
