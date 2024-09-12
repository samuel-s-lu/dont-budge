using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly DontBudgeDbContext _dbContext;
        public BudgetController(DontBudgeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetBudget() {
            var transactions = _dbContext.Budget.ToList();

            return Ok(transactions);
        }

        [HttpPost]
        public IActionResult UpdateBudget(Budget request) {
            foreach (var budget in _dbContext.Budget) {
                _dbContext.Budget.Remove(budget);
            }

            _dbContext.Budget.Add(request);
            _dbContext.SaveChanges();

            return Ok(request);
        }
    }
}