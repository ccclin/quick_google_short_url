class CreateTableShorturl < ActiveRecord::Migration
  def change
    create_table :shorturls do |t|
      t.text :url, limit: 655362
      t.string :goo_url
      t.timestamps
    end

    add_index :shorturls, :url, using: :btree
  end
end
