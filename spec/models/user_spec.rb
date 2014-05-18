require 'spec_helper'

describe 'User' do
  describe "#toggle_favorite" do

    before :each do
      @user = FactoryGirl.build(:user)
      @user.save(:validate => false)
      @track = FactoryGirl.create(:track)
    end

    it "adds track to favorites" do
      @user.toggle_favorite @track
      expect(@user.tracks.count).to eql 1 
    end

    it "removes track if already a favorite" do
      @user.toggle_favorite @track
      #Toggle track
      @user.toggle_favorite @track
      expect(@user.tracks.count).to eql 0 
    end
  end
end 
