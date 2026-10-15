# frozen_string_literal: true

module RentalCatalog
  # Generate real, indexable pages from the catalog on every Jekyll build.
  class Generator < Jekyll::Generator
    priority :normal

    def generate(site)
      items = site.data.fetch('rental_items', [])
      categories = items.group_by { |item| item.fetch('category_slug') }
      used_urls = site.pages.map(&:url) + site.collections.values.flat_map { |collection| collection.docs.map(&:url) }

      categories.each do |slug, category_items|
        name = category_items.first.fetch('category')
        category_url = "/rentals/#{slug}/"
        add_page(site, used_urls, category_url, {
          'layout' => 'rental-category',
          'title' => "#{name} Rentals",
          'description' => "Browse #{name.downcase} for your event. Compare individual rental equipment, explore specifications, and request availability.",
          'category_name' => name,
          'category_slug' => slug,
          'rental_items' => category_items,
          'image' => category_items.first.fetch('image')
        })

        category_items.each do |item|
          add_page(site, used_urls, "#{category_url}#{item.fetch('slug')}/", {
            'layout' => 'rental-item',
            'title' => item.fetch('name'),
            'description' => item.fetch('description'),
            'image' => item.fetch('image'),
            'rental_item' => item,
            'category_url' => category_url
          })
        end
      end
    end

    private

    def add_page(site, used_urls, url, data)
      if used_urls.include?(url)
        raise Jekyll::Errors::FatalException, "Duplicate rental catalog URL: #{url}"
      end

      used_urls << url
      page = Jekyll::PageWithoutAFile.new(site, site.source, url.delete_prefix('/'), 'index.html')
      page.content = ''
      page.data.merge!(data.merge('permalink' => url))
      site.pages << page
    end
  end
end
