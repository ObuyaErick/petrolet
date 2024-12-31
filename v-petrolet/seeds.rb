require 'faker'

pp (1..9).to_a.map { { question: Faker::Lorem.sentence, answer: Faker::Lorem.paragraphs.join("") } }
