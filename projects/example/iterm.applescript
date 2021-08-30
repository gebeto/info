activate application "iTerm"

tell application "iTerm"
	if (window count) is equal to 0 then
		reopen
	    repeat until exists window 1
	        delay 0.01
	    end repeat
	end if
	activate

	set pane_1 to (current session of current window)

	tell pane_1
		set pane_2 to (split horizontally with same profile)
	end tell

	tell pane_1
		write text "cd ~/Desktop/dir-1"
		set name to "sample-two-panes"
	end tell

	tell pane_2
		write text "cd ~/Desktop/dir-2"
		set name to "sample-two-panes"
	end tell
end tell

tell application "System Events" to tell process "iTerm2"
	set value of attribute "AXFullScreen" of window 1 to true
end tell
