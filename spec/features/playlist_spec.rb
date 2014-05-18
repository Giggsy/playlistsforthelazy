require 'spec_helper'

describe "Playlist" do
  describe "searches for a subreddit", :js => true do
    before :each do
      visit root_path
    end

    #TODO Change test to use VCR
    it "creates new playlist" do
      fill_in_search_bar
      expect(Playlist.first.subreddit).to eql "music"
    end

    it "archives playlist" do
      fill_in_search_bar
      click_button "Archives"
      expect(page).to have_content "music"
    end
  end
end

def fill_in_search_bar
  fill_in 'subreddit-search-bar', :with => "music"
  find('#subreddit-search-bar').native.send_keys(:return)
  sleep 3
end
