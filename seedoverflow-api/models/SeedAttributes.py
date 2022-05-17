import enum

class SeedEnumMeta(enum.EnumMeta):
    def __contains__(cls, item):
        try:
            cls(item)
        except ValueError:
            return False
        else:
            return True

class SeedAttribute(enum.Enum, metaclass=SeedEnumMeta):
    Flat = "Flat",
    Mountain = "Mountain",
    Desert = "Desert",
    Ocean = "Ocean",
    Stronghold = "Stronghold",
    Village = "Village",
    Mineshaft = "Mineshaft",
    PillagerOutpost = "Pillager Outpost",
    DesertPyramid = "Desert Pyramid",
    WoodlandMansion = "Woodland Mansion",
    Shipwreck = "Shipwreck",
    VillageBlacksmith = "Village Blacksmith",
    Igloo = "Igloo",
    MushroomIsland = "Mushroom Island",
    OceanMonument = "Ocean Monument",
    Jungle = "Jungle",
    BambooForest = "BambooForest",
    Meadow = "Meadow",
    Flowers = "Flowers",
    Badlands = "Badlands",
    Snow = "Snow",
    Swamp = "Swamp",
    Ravine = "Ravine",
    JavaEdition = "Java Edition",
    BedrockEdition = "Bedrock Edition",
    MobSpawner = "Mob Spawner",
    Savanna = "Savanna",
    Taiga = "Taiga",
    OverrunVillage = "Overrun Village",
    CoralReef = "Coral Reef",
    JungleTemple = "Jungle Temple",
    WitchHut = "Witch Hut",
    LargeCave = "Large Cave",
    SurfaceCave = "Surface Cave",
    LushCave = "Lush Cave",
    LonelyIsland = "Lonely Island",
    Mesa = "Mesa",
    IceSpikes = "Ice Spikes",
    Icebergs = "Icebergs",
    ExtremeHill = "Extreme Hill",
    Fossil = "Fossil",
    Forest = "Forest",
    AncientCity = "Ancient City"