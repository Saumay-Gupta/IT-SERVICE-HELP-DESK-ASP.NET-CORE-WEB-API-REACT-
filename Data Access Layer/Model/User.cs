using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capstone.DAL.Model
{
    public class User
    {
        [Key]
        [MaxLength(20)]
        public string UserName { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(20)]
        public string Password { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        // FK
        public int RoleId  { get; set; } 

        // Navigation Property
        public Role? Role { get; set; }
    }
}
