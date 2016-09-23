module Jekyll
  module HandleFilter

    def handleize(content)
      content.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
    end

  end
end

Liquid::Template.register_filter(Jekyll::HandleFilter)

