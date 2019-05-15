json.(@message, :text, :image_url)
json.name  @message.user.name
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image.url
json.id @message.id
