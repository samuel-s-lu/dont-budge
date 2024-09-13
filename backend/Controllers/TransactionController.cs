using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult GetTransactions([FromQuery] int? year, [FromQuery] int? month, [FromQuery] string? category) {
            var query = _dbContext.Transactions.AsQueryable();
            
            if (year.HasValue) {
                query = query.Where(t => t.Date.Year == year.Value);
            }
            if (month.HasValue) {
                query = query.Where(t => t.Date.Month == month.Value);
            }
            if (!string.IsNullOrEmpty(category)) {
                query = query.Where(t => t.Category == EnumExtensions.StrToEnum(category));
            }

            var transactions = query
                .OrderByDescending(t => t.Date)
                .Select(t => new
                    {
                        t.Id,
                        t.Name,
                        t.Amount,
                        Category = t.Category.ToString().ToLower(),
                        t.Date
                    }
                )
                .ToList();

            return Ok(transactions);
        }

        [HttpPost]
        public IActionResult AddTransaction(AddTransactionDTO request) {
            string[] date = request.Date.Split('-');
            int year = int.Parse(date[0]);
            int month = int.Parse(date[1]);
            int day = int.Parse(date[2]);

            var transaction = new Transaction{
                Id = Guid.NewGuid(),
                Name = request.Name,
                Amount = request.Amount,
                Category = EnumExtensions.StrToEnum(request.Category),
                Date = new DateOnly(year, month, day)
            };

            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();

            return Ok(transaction);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteTransaction(Guid id) {
            var transaction = _dbContext.Transactions.Find(id);

            if (transaction is not null) {
                _dbContext.Transactions.Remove(transaction);
                _dbContext.SaveChanges();
            }

            return Ok();
        }
    }
}