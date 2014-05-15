require 'spec_helper'

describe "Playlist" do
  describe "searches for a subreddit", :js => true do
    before :each do
      visit root_path
    end

    #TODO Change test to use VCR
    it "creates new playlist" do
      fill_in_search_bar
      sleep 5
      expect(Playlist.first.subreddit).to eql "music"
      expect(Playlist.tracks.count).to gte 5 
    end

  end
end

def fill_in_search_bar
  fill_in 'subreddit-search-bar', :with => "music"
  find('#subreddit-search-bar').native.send_keys(:return)
end
