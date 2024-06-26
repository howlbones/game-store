#! /usr/bin/env node

console.log(
  'Populating'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Game = require("./models/game");
const Studio = require("./models/studio");

const categories = [];
const games = [];
const studios = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://heresywolves:mACSNDL7e3BRZGTO@cluster0.avuxlqr.mongodb.net/store?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createStudios();
  await createGames();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function gameCreate(index, title, studio, release_date, summary, category, quantity, price, sale_percent, img_path) {
  const gameDetails= { title, studio, release_date, summary, category, quantity, price, sale_percent, img_path};

  const game = new Game(gameDetails);

  await game.save();
  games[index] = game;
  console.log(`Added game: ${title}`);
}

async function studioCreate(index, name, about) {
  const studioDetails = {name, about};

  const studio = new Studio(studioDetails);
  await studio.save();
  studios[index] = studio;
  console.log(`Added studio: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, 
      "Third-person shooter",
      `Third-person shooter (TPS) is a subgenre of 3D shooter games in which the gameplay consists primarily of shooting. It is closely related to first-person shooters, but with the player character visible on-screen during play. While 2D shoot 'em up games also employ a third-person perspective, the TPS genre is distinguished by having the game presented with the player's avatar as a primary focus of the camera's view. 
    `),
    categoryCreate(1, 
      "Mecha",
      `In science fiction, mecha (Japanese: メカ, Hepburn: meka) or mechs are giant robots or machines typically depicted as piloted and as humanoid walking vehicles. The term was first used in Japanese after shortening the English loanword 'mechanism' (メカニズム, mekanizumu) or 'mechanical' (メカニカル, mekanikaru), but the meaning in Japanese is more inclusive, and 'robot' (ロボット, robotto) or 'giant robot' is the narrower term.

      Fictional mecha vary greatly in size and shape, but are distinguished from vehicles by their humanoid or biomorphic appearance, although they are bigger, often much bigger, than human beings. Different subgenres exist, with varying connotations of realism. The concept of Super Robot and Real Robot are two such examples found in Japanese anime and manga.
      
      Real-world piloted humanoid or non-humanoid robotic platforms, existing or planned, may also be called "mecha". In Japanese, "mecha" may refer to mobile machinery or vehicles (including aircraft) in general, piloted or otherwise. `
    ),
    categoryCreate(2, 
      "Survival",
      `Survival games are a subgenre of action games which are often set in hostile, intense, open-world environments. Players generally start with minimal equipment and are required to survive as long as possible by finding the resources necessary to manage hunger, thirst, disease and/or mental state. Many survival games are based on randomly or procedurally generated persistent environments; more recently, survival games are often playable online, allowing players to interact in a single world. Survival games are generally open-ended with no set goals and often closely related to the survival horror genre, where the player must survive within a supernatural setting, such as a zombie apocalypse. `  
    ),
    categoryCreate(3, 
      "Horror",
      `A horror game is a video game genre centered on horror fiction and typically designed to scare the player. The term may also be used to describe tabletop games with horror fiction elements.

      Unlike most other video game genres, which are classified by their gameplay, horror games are nearly always based on narrative or visual presentation, and use a variety of gameplay types.`
    ),
  ]);
}

async function createStudios() {
  console.log("Adding studios");
  await Promise.all([
    studioCreate(0,
      "FromSoftware",
      "FromSoftware, Inc. is a Japanese video game development and publishing company. It was founded by Naotoshi Zin in Tokyo on November 1, 1986. Initially a developer of business software, the company released their first video game, King's Field, for the PlayStation in 1994."
    ),
    studioCreate(1,
      "Zeekerss",
      "Zeekerss isn’t a ‘studio’ but the solo developer behind the indie horror game Lethal Company and at the time of its release in October 2023, Zeekerss was 21 years old. This news can be surprising because the gameplay, mechanics, and features of the game do not look like it’s made by someone alone, especially since the updates are pretty regular and well done. The title is still in early access at the time of writing this article but already has 250K+ “Overwhelmingly Positive” reviews which is a tough feat, even for established devs and AAA publishers.", 
    )
  ]);
}

async function createGames() {
  console.log("Adding games");
  await Promise.all([
    gameCreate(0, 
      "Armored Core VI: Fires of Rubicon",
      studios[0], 
      new Date('August 25, 2023'), 
      "The augmented mercenary C4-621 is smuggled onto Rubicon with the assistance of their boss, Handler Walter. Upon landing on Rubicon, C4-621 steals the callsign of a deceased mercenary, becoming \"Raven\". With the new identity, Raven inserts themselves into the war raging on Rubicon's surface between the megacorporations Balam Industries and Arquebus Corp, the anti-corporation Rubicon Liberation Front (RLF), and the Planetary Closure Administration (PCA), who are all racing to find or protect the Coral. During numerous battles, Raven ends up befriending V.IV Rusty, an elite AC pilot working for Arquebus's Vespers unit; \"Cinder\" Carla, leader of RaD, a black market arms dealing company; and G1 Michigan, the leader of Balam's Redgun unit who treats Raven as an honorary member. They occasionally provide assistance directly or through comms. In addition, Raven encounters G5 Iguazu, a Redgun AC pilot who envies Raven's exploits and develops a one-sided rivalry with them; and V.II Snail, the leader of Arquebus's Vespers who looks down on Raven due to his superiority complex. Later, Raven assaults the PCA facility and is caught in a Coral surge, resulting in them making contact with an entity named Ayre who can speak directly to their mind.",
      [categories[0], categories[1]],
      50,
      59.99,
      0,
      "/images/armored_core4.webp"
    ),
    gameCreate(1,
      "Lethal Company",
      studios[1],
      new Date('October 23, 2023'),
      "In Lethal Company, players obtain and sell scrap from abandoned, industrialized exomoons while avoiding traps, environmental hazards, and monsters. As employees of \"The Company\", players must sell enough scrap to meet a series of increasing profit quotas until they inevitably fail and the game starts over.",
      [categories[2], categories[3]],
      267,
      9.99,
      0,
      "/images/lethal_company.jpg"
    ),
  ]);
}

