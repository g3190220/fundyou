const Color = {
    Brown: "#955436",
    LightBlue: "#AAE0FA",
    Pink: "#D93A96",
    Orange: "#F7941D",
    Red: "#ED1B24",
    Yellow: "#FEF200",
    Green: "#1FB25A",
    Blue: "#0072BB",
}

const TileId = {
    Tile_0: "SAC Loop",
    Tile_1: "Earth and Space Sciences",
    Tile_2: "Community Chest",
    Tile_3: "Javits Lecture Center",
    Tile_4: "Tuition",
    Tile_5: "East Side Dining",
    Tile_6: "Harriman Hall",
    Tile_7: "Chance",
    Tile_8: "Frey Hall",
    Tile_9: "Frank Melville Jr. Memorial Library",
    Tile_10: "Jail",
    Tile_11: "Benedict College",
    Tile_12: "Softheon Bikes",
    Tile_13: "Langmuir College",
    Tile_14: "James College",
    Tile_15: "West Side Dining",
    Tile_16: "Light Engineering",
    Tile_17: "Community Chest",
    Tile_18: "Old Computer Science",
    Tile_19: "New Computer Science",
    Tile_20: "South Parking",
    Tile_21: "Mount College",
    Tile_22: "Chance",
    Tile_23: "Cardozo College",
    Tile_24: "Gershwin College",
    Tile_25: "Roth Cafe",
    Tile_26: "Humanities",
    Tile_27: "Staller Center",
    Tile_28: "SBU Bus",
    Tile_29: "Charles B. Wang Center",
    Tile_30: "Go to Jail",
    Tile_31: "Island Federal Arena",
    Tile_32: "Recreation Center",
    Tile_33: "Community Chest",
    Tile_34: "LaValle Stadium",
    Tile_35: "Jasmine",
    Tile_36: "Chance",
    Tile_37: "Chavez",
    Tile_38: "Student Activity Fee ",
    Tile_39: "Tubman",
}

const BuildingPrices = {
    /* [0, Rent, 1 House, 2, 3, 4, Hotel, Mortgage, Hotel/House Cost]
    /* Dark Purples */
    ID_1: [0, 2, 10, 30, 90, 160, 250, 60, 50],
    ID_3: [0, 4, 20, 60, 180, 320, 450, 60, 50],

    /* Light Blues */
    ID_6: [0, 6, 30, 90, 270, 400, 550, 100, 50],
    ID_8: [0, 6, 30, 90, 270, 400, 550, 100, 50],
    ID_9: [0, 8, 40, 100, 300, 450, 600, 120, 50],

    /* Purples */
    ID_11: [0, 10, 50, 150, 450, 625, 750, 140, 100],
    ID_13: [0, 10, 50, 150, 450, 625, 750, 140, 100],
    ID_14: [0, 12, 60, 180, 500, 700, 900, 160, 100],

    /* Oranges */
    ID_16: [0, 14, 70, 200, 550, 750, 950, 180, 100],
    ID_18: [0, 14, 70, 200, 550, 750, 950, 180, 100],
    ID_19: [0, 16, 80, 220, 600, 800, 1000, 200, 100],

    /* Yellows */
    ID_21: [0, 24, 120, 360, 850, 1025, 1200, 280, 150],
    ID_23: [0, 22, 110, 330, 800, 975, 1150, 260, 150],
    ID_24: [0, 22, 110, 330, 800, 975, 1150, 260, 150],

    /* Reds */
    ID_26: [0, 20, 100, 300, 750, 950, 1100, 240, 150],
    ID_27: [0, 18, 90, 250, 700, 875, 1050, 220, 150],
    ID_29: [0, 18, 90, 250, 700, 875, 1050, 220, 150],

    /* Dark Blues */
    ID_31: [0, 50, 200, 600, 1400, 1700, 2000, 400, 200],
    ID_33: [0, 35, 175, 500, 1100, 1300, 1500, 350, 200],

    /* Greens */
    ID_36: [0, 28, 150, 450, 1000, 1200, 1400, 320, 200],
    ID_38: [0, 26, 130, 390, 900, 1100, 1275, 300, 200],
    ID_39: [0, 26, 130, 390, 900, 1100, 1275, 300, 200],

    /* Railroads/Dining Halls */
    ID_5: [0, 25, 50, 100, 200],
    ID_15: [0, 25, 50, 100, 200],
    ID_25: [0, 25, 50, 100, 200],
    ID_35: [0, 25, 50, 100, 200],

    /* Utility (what you multiply with depending on how many you have*/
    ID_12: [0, 4, 10],
    ID_22: [0, 4, 10],
}