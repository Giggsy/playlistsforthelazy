require 'spec_helper'

describe Playlist do
  describe ".create_if_no_recent" do
    it "creates a new playlist if no recent playlist exists" do
      Playlist.create_if_no_recent 'music', sample_tracks
      expect(Playlist.count).to eql 1
    end

    it "creates a new playlist if most recent playlist is > 6 hours old" do
      six_hour_old_playlist = Playlist.create(:subreddit => 'music')
      six_hour_old_playlist.update_attribute(:created_at, 7.hours.ago)
      Playlist.create_if_no_recent 'music', sample_tracks
      expect(Playlist.count).to eql 2
    end
  end

  describe "#add_tracks" do
    it "adds tracks to playlist" do
      playlist = Playlist.create_if_no_recent 'music', sample_tracks
      expect(playlist.tracks.count).to eql 2
    end

    it "does not create new tracks if track already exists" do
      Playlist.create_if_no_recent 'music', sample_tracks
      playlist = Playlist.create_if_no_recent 'funny', sample_tracks
      expect(playlist.tracks.count).to eql 2 
      expect(Track.count).to eql 2
    end
  end
end

def sample_tracks
  [
    {title: "Ghost Beach - Miracle (Official Music Video)", thumbnail: "http://i1.ytimg.com/vi/73xPEEF92JY/hqdefault.jpg", video_id: "73xPEEF92JY"},
    {title: "Datassette - Power Ballad (OFFICIAL VIDEO)", thumbnail: "http://i1.ytimg.com/vi/DpEHgBslTPs/hqdefault.jpg", video_id: "DpEHgBslTPs"}
  ]
end
