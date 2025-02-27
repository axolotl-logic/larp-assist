# LARP Assist by Axolotl Logic

## Overview

LARP Assist is a virtual in-game library and market to be used by players and GMs
during LARPs.

It uses Firestore as its persistence layer and is currently served on Firebase.

## Get Started

```bash
npm install
npm run dev
```

## Technologies Used

**Firestore and Pinia stores** - We are backing our Pinia stores with
Firestore's api, which lets you interact with the database/document store
directly from a web client, simplifying things tremendously. Firestore's
security rules match on the currently authorized user.

**Google Cloud Functions** - This is for mutation of state when complex auth
rules are needed. For example, when a player buys something in
the market, they need to have write access to their balance and whatever is tracking
the item. This would have been a complete mess to protect with firestore rules alone.

## Directory Structure

### src/components/{player,gm,common}

Components are organized as such:

user
./player - Components players use to view and interact with the world
./gm - The components used by GMs manage the game
./common - Common UI components

### src/stores/

This is where the Pinia stores are found. Pinia is a Store for Vue.
It's responsible for managing state of business objects.
