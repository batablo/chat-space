json.array! @messages do |message|
  json.text message.text
  json.image_url  message.image.url
  json.name message.user.name
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id message.id
end
