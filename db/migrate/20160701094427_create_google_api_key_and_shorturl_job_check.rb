class CreateGoogleApiKeyAndShorturlJobCheck < ActiveRecord::Migration[5.0]
  def change
    create_table :google_api_keys do |t|
      t.references :user
      t.string :key
      t.timestamps
    end
    create_table :shorturl_job_checks do |t|
      t.references :user
      t.integer :job_done
      t.timestamps
    end

    add_index :shorturl_job_checks, :job_done
  end
end
