class Start extends Scene {
    create() {
        let story = this.engine.storyData;
        this.engine.setTitle(story.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        this.engine.fullBelly = false
        this.engine.item = 0;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let story = this.engine.storyData;
        let locationData = story.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if (choice.Full != null) {
                    if (choice.Full == this.engine.fullBelly) {
                        this.engine.addChoice(choice.Text, choice);
                    }
                } else {
                    this.engine.addChoice(choice.Text, choice);
                } // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }

        if(locationData.Eat) {
            this.engine.fullBelly = true;
        }
    }

    handleChoice(choice) {
        if (choice) {
            if (choice.Context) {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(ContextSensitive, choice.Target)
            } else {
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

class ContextSensitive extends Location {
    create(key) {
        let story = this.engine.storyData;
        let locationData = story.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body[this.engine.item].Message); 
        // TODO: replace this text by the Body of the location data

        this.engine.item++;
        if (this.engine.item == locationData.Length) {
            this.engine.item = 0;
        }
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice);
                // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
}

Engine.load(Start, 'myStory.json');