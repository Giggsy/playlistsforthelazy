class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :thumbnail
      t.string :video_id

      t.timestamps
    end
  end
end
