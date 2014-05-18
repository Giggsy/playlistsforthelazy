class CreateJoinTableTrackUser < ActiveRecord::Migration
  def change
    create_join_table :tracks, :users do |t|
      # t.index [:track_id, :user_id]
      # t.index [:user_id, :track_id]
    end
  end
end
