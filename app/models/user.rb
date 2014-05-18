class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :tracks  

  def toggle_favorite track
    if tracks.include? track
      tracks.delete track
    else
      tracks << track
    end
  end
end
