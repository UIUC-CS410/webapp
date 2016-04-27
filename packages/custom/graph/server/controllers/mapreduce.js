// matrix = path user chose (APA, APTPA, or APVPA)
// input = author id
map = function(matrix, input) {
    // matrix is triangular 
    if (input >= this.matrix.index2) {
        // switch i j if needed since matrix is triangular
        Mii = this.matrix.find({index1 = input}, index2 = input);
        Mjj = this.matrix.find({index1 = this.matrix.index2}, index2 = this.matrix.index2);
        Mij = this.matrix.find({index1 = input}, index2 = this.matrix.index2);
        
        emit(this.matrix.index2, Mij/(Mii + Mjj));
    }
}

reduce = function(k, v) {
    // sort and return top 20
}