class AddColumnUserIdInShorturl < ActiveRecord::Migration[5.0]
  def change
    add_column :shorturls, :user_id, :integer
  end
end
