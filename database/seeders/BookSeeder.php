<?php

namespace Database\Seeders;


use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    \App\Models\Book::truncate();
    $books = [
      [
        "title" => "Atomic Habits",
        "description" => "A highly practical guide that breaks down habit formation into simple, actionable steps. It focuses on how small, 1% improvements can lead to massive results over time.",
        "category" => "productivity",
        "trending" => true,
        "coverImage" => "images/books/atomic-habits.png",
        "oldPrice" => 35.00,
        "newPrice" => 27.00
      ],
      [
        "title" => "Deep Work",
        "description" => "Newport argues that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare and valuable in our modern economy.",
        "category" => "productivity",
        "trending" => true,
        "coverImage" => "images/books/deep-work.png",
        "oldPrice" => 32.00,
        "newPrice" => 28.00
      ],
      [
        "title" => "Essentialism",
        "description" => "This book isn't about doing more in less time; it's about getting only the right things done. It teaches a systematic discipline for discerning what is absolutely essential.",
        "category" => "productivity",
        "trending" => false,
        "coverImage" => "images/books/essentialism.png",
        "oldPrice" => 30.00,
        "newPrice" => 26.00
      ],
      [
        "title" => "Zero to One",
        "description" => "A book on how to build companies that create new things. Thiel contends that tomorrow’s champions will not win by competing ruthlessly in today’s marketplace, but by escaping competition altogether.",
        "category" => "business",
        "trending" => true,
        "coverImage" => "images/books/zero-to-one.jpg",
        "oldPrice" => 34.00,
        "newPrice" => 27.00
      ],
      [
        "title" => "Slow Productivity",
        "description" => "A newer philosophy for accomplishment that rejects 'pseudo-productivity.' It advocates for doing fewer things, working at a natural pace, and obsessing over quality.",
        "category" => "productivity",
        "trending" => true,
        "coverImage" => "images/books/slow-productivity.png",
        "oldPrice" => 36.00,
        "newPrice" => 29.00
      ],
      [
        "title" => "The 12 Week Year",
        "description" => "This book introduces a system to shorten your execution cycle from a year to 12 weeks, creating more focus and urgency in achieving your goals.",
        "category" => "productivity",
        "trending" => false,
        "coverImage" => "images/books/12-week-year.png",
        "oldPrice" => 30.00,
        "newPrice" => 25.00
      ],
      [
        "title" => "The Productivity Project",
        "description" => "Bailey outlines the results of a year-long experiment where he tested various productivity techniques on himself to find out what actually works and why.",
        "category" => "productivity",
        "trending" => false,
        "coverImage" => "images/books/book-14.png",
        "oldPrice" => 29.00,
        "newPrice" => 26.00
      ],
      [
        "title" => "The 48 Laws of Power",
        "description" => "A comprehensive and historical study of power dynamics, drawing lessons from figures like Machiavelli, Sun Tzu, and Carl von Clausewitz.",
        "category" => "business",
        "trending" => true,
        "coverImage" => "images/books/book-15.png",
        "oldPrice" => 32.00,
        "newPrice" => 26.00
      ],
      [
        "title" => "Unreasonable Hospitality",
        "description" => "Guidara explains how his restaurant became the best in the world by using 'unreasonable hospitality'—the practice of giving people more than they expect.",
        "category" => "business",
        "trending" => true,
        "coverImage" => "images/books/book-16.png",
        "oldPrice" => 35.00,
        "newPrice" => 28.00
      ],
      [
        "title" => "The Five Dysfunctions of a Team",
        "description" => "A leadership fable that identifies the five pitfalls teams face as they seek to grow together: absence of trust, fear of conflict, lack of commitment, avoidance of accountability, and inattention to results.",
        "category" => "business",
        "trending" => false,
        "coverImage" => "images/books/book-17.png",
        "oldPrice" => 30.00,
        "newPrice" => 25.00
      ],
      [
        "title" => "The Great Gatsby",
        "description" => "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/the-great-gatsby.jpg",
        "oldPrice" => 15.99,
        "newPrice" => 12.99
      ],
      [
        "title" => "To Kill a Mockingbird",
        "description" => "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/to-kill-a-mockingbird.jpg",
        "oldPrice" => 18.99,
        "newPrice" => 14.99
      ],
      [
        "title" => "1984",
        "description" => "Winston Smith joins a secret revolutionary group dedicated to the destruction of the Party and the downfall of Big Brother.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/1984.jpg",
        "oldPrice" => 16.99,
        "newPrice" => 11.99
      ],
      [
        "title" => "Pride and Prejudice",
        "description" => "The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/pride-and-prejudice.jpg",
        "oldPrice" => 14.99,
        "newPrice" => 10.99
      ],
      [
        "title" => "The Catcher in the Rye",
        "description" => "The story of Holden Caulfield, a teenager who has just been expelled from his prep school.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/the-catcher-in-the-rye.jpg",
        "oldPrice" => 14.99,
        "newPrice" => 9.99
      ],
      [
        "title" => "The Hobbit",
        "description" => "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, until Gandalf arrives.",
        "category" => "adventure",
        "trending" => true,
        "coverImage" => "images/books/the-hobbit.jpg",
        "oldPrice" => 21.99,
        "newPrice" => 16.99
      ],
      [
        "title" => "Fahrenheit 451",
        "description" => "Ray Bradbury's dystopian classic of a future society where books are burned.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/fahrenheit-451.jpg",
        "oldPrice" => 19.99,
        "newPrice" => 14.99
      ],
      [
        "title" => "Moby-Dick",
        "description" => "The voyage of the whaling ship Pequod, commanded by Captain Ahab, who is on a quest for revenge.",
        "category" => "adventure",
        "trending" => false,
        "coverImage" => "images/books/moby-dick.jpg",
        "oldPrice" => 24.99,
        "newPrice" => 18.99
      ],
      [
        "title" => "War and Peace",
        "description" => "Tolstoy's epic novel of the Napoleonic Wars and their impact on five aristocratic families.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/war-and-peace.jpg",
        "oldPrice" => 29.99,
        "newPrice" => 24.99
      ],
      [
        "title" => "The Odyssey",
        "description" => "The epic poem that tells the story of Odysseus' ten-year journey home after the Trojan War.",
        "category" => "adventure",
        "trending" => true,
        "coverImage" => "images/books/the-odyssey.jpg",
        "oldPrice" => 12.99,
        "newPrice" => 9.99
      ],
      [
        "title" => "Ulysses",
        "description" => "James Joyce's landmark work that chronicles the appointments and encounters of Leopold Bloom in Dublin.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/ulysses.jpg",
        "oldPrice" => 27.99,
        "newPrice" => 21.99
      ],
      [
        "title" => "Crime and Punishment",
        "description" => "Dostoevsky's exploration of the themes of guilt, suffering, and redemption through Rodion Raskolnikov.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/crime-and-punishment.jpg",
        "oldPrice" => 22.99,
        "newPrice" => 17.99
      ],
      [
        "title" => "One Hundred Years of Solitude",
        "description" => "Gabriel García Márquez's masterpiece of the Buendía family in the fictional town of Macondo.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/one-hundred-years-of-solitude.jpg",
        "oldPrice" => 25.99,
        "newPrice" => 19.99
      ],
      [
        "title" => "The Brothers Karamazov",
        "description" => "A passionate philosophical novel set in 19th-century Russia, that enters deeply into ethical debates of God, free will, and morality.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/the-brothers-karamazov.jpg",
        "oldPrice" => 26.99,
        "newPrice" => 20.99
      ],
      [
        "title" => "Brave New World",
        "description" => "Aldous Huxley's vision of a future society where people are conditioned into predetermined roles.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/brave-new-world.jpg",
        "oldPrice" => 18.99,
        "newPrice" => 13.99
      ],
      [
        "title" => "Wuthering Heights",
        "description" => "The tempestuous love story of Catherine Earnshaw and Heathcliff on the Yorkshire moors.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/wuthering-heights.jpg",
        "oldPrice" => 16.99,
        "newPrice" => 12.99
      ],
      [
        "title" => "The Divine Comedy",
        "description" => "Dante's journey through Hell, Purgatory, and Paradise, guided by the Roman poet Virgil.",
        "category" => "adventure",
        "trending" => false,
        "coverImage" => "images/books/the-divine-comedy.jpg",
        "oldPrice" => 34.99,
        "newPrice" => 29.99
      ],
      [
        "title" => "Jane Eyre",
        "description" => "The story of a young orphan who overcomes hardship to find fulfillment as a governess and the wife of Rochester.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/jane-eyre.jpg",
        "oldPrice" => 14.99,
        "newPrice" => 10.99
      ],
      [
        "title" => "Anna Karenina",
        "description" => "Tolstoy's tragic story of the adulterous relationship between Anna Karenina and Count Vronsky.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/anna-karenina.jpg",
        "oldPrice" => 23.99,
        "newPrice" => 18.99
      ],
      [
        "title" => "The Iliad",
        "description" => "The epic poem that tells the story of the wrath of Achilles and the Trojan War.",
        "category" => "adventure",
        "trending" => false,
        "coverImage" => "images/books/the-iliad.jpg",
        "oldPrice" => 12.99,
        "newPrice" => 9.99
      ],
      [
        "title" => "Don Quixote",
        "description" => "The adventures of the self-proclaimed knight-errant Don Quixote and his faithful squire Sancho Panza.",
        "category" => "adventure",
        "trending" => true,
        "coverImage" => "images/books/don-quixote.jpg",
        "oldPrice" => 26.99,
        "newPrice" => 21.99
      ],
      [
        "title" => "Madame Bovary",
        "description" => "The tragic story of Emma Bovary, who seeks romance and social status through adulterous affairs and extravagent living.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/madame-bovary.jpg",
        "oldPrice" => 16.99,
        "newPrice" => 12.99
      ],
      [
        "title" => "The Adventures of Huckleberry Finn",
        "description" => "The story of Huck Finn and Jim's journey down the Mississippi River.",
        "category" => "adventure",
        "trending" => true,
        "coverImage" => "images/books/the-adventures-of-huckleberry-finn.jpg",
        "oldPrice" => 14.99,
        "newPrice" => 10.99
      ],
      [
        "title" => "Great Expectations",
        "description" => "The story of the orphan Pip and his growth from childhood in the Kent marshes to becoming a gentleman in London.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/great-expectations.jpg",
        "oldPrice" => 18.99,
        "newPrice" => 13.99
      ],
      [
        "title" => "Middlemarch",
        "description" => "George Eliot's masterpiece that explores the social and political life of the fictional town of Middlemarch.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/middlemarch.jpg",
        "oldPrice" => 22.99,
        "newPrice" => 17.99
      ],
      [
        "title" => "Gulliver's Travels",
        "description" => "The satirical travels of Lemuel Gulliver to various strange worlds.",
        "category" => "adventure",
        "trending" => true,
        "coverImage" => "images/books/gullivers-travels.jpg",
        "oldPrice" => 14.99,
        "newPrice" => 10.99
      ],
      [
        "title" => "Frankenstein",
        "description" => "Mary Shelley's classic story of scientific hubris and the consequences of creating life.",
        "category" => "horror",
        "trending" => true,
        "coverImage" => "images/books/frankenstein.jpg",
        "oldPrice" => 16.99,
        "newPrice" => 12.99
      ],
      [
        "title" => "Dracula",
        "description" => "Bram Stoker's seminal vampire novel that established many of the tropes of the genre.",
        "category" => "horror",
        "trending" => true,
        "coverImage" => "images/books/dracula.jpg",
        "oldPrice" => 18.99,
        "newPrice" => 14.99
      ],
      [
        "title" => "The Portrait of a Lady",
        "description" => "The story of a young American woman, Isabel Archer, who travels to Europe and is manipulated by a fortune-hunter.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/the-portrait-of-a-lady.jpg",
        "oldPrice" => 19.99,
        "newPrice" => 15.99
      ],
      [
        "title" => "Heart of Darkness",
        "description" => "Conrad's exploration of the darkness at the core of human nature during a journey up the Congo River.",
        "category" => "adventure",
        "trending" => false,
        "coverImage" => "images/books/heart-of-darkness.jpg",
        "oldPrice" => 12.99,
        "newPrice" => 9.99
      ],
      [
        "title" => "The Sound and the Fury",
        "description" => "Faulkner's modernist masterpiece that chronicles the decline of the Compson family.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/the-sound-and-the-fury.jpg",
        "oldPrice" => 21.99,
        "newPrice" => 16.99
      ],
      [
        "title" => "Beloved",
        "description" => "Toni Morrison's powerful novel of the consequences of slavery on the human soul.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/beloved.jpg",
        "oldPrice" => 19.99,
        "newPrice" => 14.99
      ],
      [
        "title" => "To the Lighthouse",
        "description" => "Virginia Woolf's stream-of-consciousness novel that explores the inner lives of the Ramsay family.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/to-the-lighthouse.jpg",
        "oldPrice" => 18.99,
        "newPrice" => 13.99
      ],
      [
        "title" => "The Stranger",
        "description" => "Albert Camus' story of a man who commits a senseless murder and is unable to feel remorse.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/the-stranger.jpg",
        "oldPrice" => 15.99,
        "newPrice" => 11.99
      ],
      [
        "title" => "The Sun Also Rises",
        "description" => "Hemingway's novel of the 'Lost Generation' and their aimless travels in post-war Europe.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/the-sun-also-rises.jpg",
        "oldPrice" => 17.99,
        "newPrice" => 12.99
      ],
      [
        "title" => "Invisible Man",
        "description" => "Ralph Ellison's powerful novel of a young Black man's experiences in a racist society.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/invisible-man.jpg",
        "oldPrice" => 21.99,
        "newPrice" => 16.99
      ],
      [
        "title" => "Catch-22",
        "description" => "Joseph Heller's satirical masterpiece about the absurdity of war.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/catch-22.jpg",
        "oldPrice" => 18.99,
        "newPrice" => 13.99
      ],
      [
        "title" => "Lolita",
        "description" => "Vladimir Nabokov's controversial story of Humbert Humbert's obsession with a young girl.",
        "category" => "fiction",
        "trending" => false,
        "coverImage" => "images/books/lolita.jpg",
        "oldPrice" => 24.99,
        "newPrice" => 19.99
      ],
      [
        "title" => "Slaughterhouse-Five",
        "description" => "Kurt Vonnegut's anti-war novel that tells the story of Billy Pilgrim, who has become 'unstuck in time'.",
        "category" => "fiction",
        "trending" => true,
        "coverImage" => "images/books/slaughterhouse-five.jpg",
        "oldPrice" => 16.99,
        "newPrice" => 12.99
      ],
      [
        "title" => "On the Road",
        "description" => "Jack Kerouac's definitive novel of the Beat Generation and their journeys across America.",
        "category" => "adventure",
        "trending" => true,
        "coverImage" => "images/books/on-the-road.jpg",
        "oldPrice" => 17.99,
        "newPrice" => 13.99
      ]
    ];

    foreach ($books as $book) {
      \App\Models\Book::create([
        "title" => $book["title"],
        "description" => $book["description"],
        "category" => $book["category"],
        "treding" => $book["trending"],
        "cover_image" => $book["coverImage"],
        "old_price" => $book["oldPrice"],
        "new_price" => $book["newPrice"],
        "stock" => rand(10, 100),
      ]);
    }
  }
}
