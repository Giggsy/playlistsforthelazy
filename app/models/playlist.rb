class Playlist < ActiveRecord::Base
  has_and_belongs_to_many :tracks

  scope :recent, -> { where("created_at > ?", 1.second.ago) }
  scope :ordered, -> { order('created_at DESC') }

  def self.create_if_no_recent subreddit, tracks
    unless recent_exists? subreddit
      playlist = Playlist.create(:subreddit => subreddit)
      playlist.add_tracks tracks
    end
    playlist
  end

  def add_tracks tracks
    ActiveRecord::Base.transaction do
      tracks.each do |track|
        duplicate_track = Track.where(:video_id => track[:video_id]).first
        if duplicate_track
          self.tracks << duplicate_track
        else
          self.tracks.create(track)
        end
      end
    end
  end

  private

  def self.recent_exists? subreddit
    Playlist.where(subreddit: subreddit).recent.count > 0
  end

  def self.recent_ordered_playlists subreddit
    Playlist.where(subreddit: subreddit).recent.ordered.first
  end

end
