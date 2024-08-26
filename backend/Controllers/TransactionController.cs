using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly DontBudgeDbContext _dbContext;
        public TransactionsController(DontBudgeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTransactions() {
            var transactions = _dbContext.Transactions
                .Select(t => new
                    {
                        t.Id,
                        t.Name,
                        t.Amount,
                        Category = t.Category.ToString(),
                        t.Date
                    }
                )
                .ToList();

            return Ok(transactions);
        }

        [HttpPost]
        public IActionResult AddTransaction(AddTransactionDTO request) {
            var transaction = new Transaction{
                Id = Guid.NewGuid(),
                Name = request.Name,
                Amount = request.Amount,
                Category = EnumExtensions.StrToEnum(request.Category),
                Date = new DateOnly(request.Year, request.Month, request.Day)
            };

            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return Ok(transaction);
        }
    }
}