class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let numberOfVampires = 0;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
    if (this.creator === vampire) {
      return vampire;
    }

    if (this === vampire.creator) {
      return this;
    }

    if (this === vampire) {
      return this;
    }

    if (!this.creator) {
      return this;
    }

    if (this.creator === vampire.creator) {
      return this.creator;
    }

    let thisVampire = this;
    let currentVampire = vampire;
    while (thisVampire) {
      while (currentVampire) {
        if (thisVampire.creator === currentVampire.creator) {
          return thisVampire.creator;
        }
        currentVampire = currentVampire.creator;
      }
      currentVampire = vampire;
      thisVampire = thisVampire.creator;
    }
  }
}

module.exports = Vampire;

