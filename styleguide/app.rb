require 'sinatra'
require 'kss'

set :public_folder, '../'

get '/' do
  erb :index
end

get '/:name' do
  @styleguide = Kss::Parser.new('../scss')
  erb :"#{params[:name]}"
end

helpers do
  def pageTitle(title)
    @pageTitle = title
  end

  def pageSection(section)
    @pageSection = section
  end

  def clientName(client)
    @clientName = client
  end

  def styleguide_block(section, &block)
    @section = @styleguide.section(section)
    @example_html = capture{ block.call }
    @escaped_html = ERB::Util.html_escape @example_html
    @_out_buf << erb(:'_partials/_styleguide_block')
  end

  def styleguide_block_transparent(section, &block)
    @section = @styleguide.section(section)
    @example_html = capture{ block.call }
    @escaped_html = ERB::Util.html_escape @example_html
    @_out_buf << erb(:'_partials/_styleguide_block_transparent')
  end

  def styleguide_icon_block(section, &block)
    @section = @styleguide.section(section)
    @example_html = capture{ block.call }
    @escaped_html = ERB::Util.html_escape @example_html
    @_out_buf << erb(:'_partials/_icon_block')
  end

  def styleguide_colour_block(section)
    @section = @styleguide.section(section)
    @_out_buf << erb(:'_partials/_colour_block')
  end

  # Captures the result of a block within an erb template without spitting it
  # to the output buffer.
  def capture(&block)
    out, @_out_buf = @_out_buf, ""
    yield
    @_out_buf
  ensure
    @_out_buf = out
  end
end
