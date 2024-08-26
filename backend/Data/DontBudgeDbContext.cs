using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DontBudgeDbContext: DbContext
    {
        public DontBudgeDbContext(DbContextOptions<DontBudgeDbContext> options)
            : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; } = null!;
    }
}