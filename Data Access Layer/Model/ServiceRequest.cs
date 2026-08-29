using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capstone.DAL.Model
{
    public class ServiceRequest
    {
        [Key]
        public int RequestId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Description { get; set; }

        [Required]
        [MaxLength(100)]
        public string Details { get; set; }

        [Required]
        [MaxLength(20)]
        public string RaisedBy { get; set; }

        [Required]
        public DateTime RaisedOn { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(50)]
        public string? Justification { get; set; }

        // FK
        public int ReqStatus { get; set; }

        // Navigation Property
        public Status? status { get; set; }
    }
}
