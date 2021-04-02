using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests
{
    public class TheoryTest
    {
        [Theory]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]


        public void TheoryTest1(int value)
        {
            Assert.True(IsOdd(value));
        }

        private bool IsOdd(int value)
        {
            return value % 2 == 1;
        }
    }
}
