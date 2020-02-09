const ob  = {
    method1: function(x) {
        this.x = x;
        const that = this;
        const exp = function(n) {
            that.x = that.x * Math.pow(10, n);
        }
        exp(3);
        return this;
    },
    method2: function(y) {
        this.x += y;
        return this;
    },
    print: function() {
        console.log(this.x);
        return this;
    }
}
ob.method1(5).method2(3).print();  // output 5008
