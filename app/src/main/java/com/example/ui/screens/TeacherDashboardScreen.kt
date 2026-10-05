package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.MainViewModel
import com.example.ui.components.FreeBadge
import com.example.ui.components.MetricStatCard
import com.example.ui.components.SectionHeader
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TeacherDashboardScreen(
    viewModel: MainViewModel,
    onBack: () -> Unit,
    onEnterClassroom: () -> Unit
) {
    var showAssignHomeworkDialog by remember { mutableStateOf(false) }
    var selectedStudentName by remember { mutableStateOf("Hamza Ali") }
    var homeworkText by remember { mutableStateOf("Memorize Surah Al-Ikhlas Ayahs 1 to 4 with Tajweed.") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Teacher Instructor Studio",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Sheikh Ahmad Al-Masri • Al-Azhar Certified",
                            fontSize = 11.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onBack, modifier = Modifier.testTag("teacher_studio_back_btn")) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    FreeBadge(modifier = Modifier.padding(end = 8.dp))
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface)
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Teacher Metrics Card
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    MetricStatCard(
                        title = "Students",
                        value = "24 active",
                        icon = Icons.Default.Groups,
                        iconColor = EmeraldPrimary,
                        bgColor = EmeraldContainer,
                        modifier = Modifier.weight(1f)
                    )
                    MetricStatCard(
                        title = "Classes Today",
                        value = "4 sessions",
                        icon = Icons.Default.CalendarToday,
                        iconColor = GoldDark,
                        bgColor = GoldContainer,
                        modifier = Modifier.weight(1f)
                    )
                }
            }

            // Today's Live Schedule
            item {
                SectionHeader(
                    title = "Today's Schedule",
                    subtitle = "Upcoming 1-on-1 student classes"
                )

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(2.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    text = "Hamza Ali (Age 7)",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "05:00 PM • Noorani Qaida & Tajweed",
                                    fontSize = 12.sp,
                                    color = EmeraldPrimary,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = EmeraldContainer
                            ) {
                                Text(
                                    text = "IN 15 MINS",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = OnEmeraldContainer,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            OutlinedButton(
                                onClick = { showAssignHomeworkDialog = true },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Text("Assign Task", fontSize = 12.sp)
                            }
                            Button(
                                onClick = onEnterClassroom,
                                modifier = Modifier.weight(1.2f).testTag("teacher_start_class_btn"),
                                shape = RoundedCornerShape(12.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary)
                            ) {
                                Icon(Icons.Default.VideoCameraFront, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Open Classroom", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            // Pending Trial Class Requests Queue
            item {
                SectionHeader(
                    title = "New Free Trial Requests",
                    subtitle = "Students requesting initial assessment"
                )

                val pendingRequests = listOf(
                    Triple("Zaid Mansoor", "Tajweed Foundations", "Tomorrow, 03:00 PM"),
                    Triple("Maryam Tariq", "Hifz Juz Amma", "Friday, 06:30 PM")
                )

                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    pendingRequests.forEach { (name, subj, time) ->
                        var isApproved by remember { mutableStateOf(false) }

                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(14.dp),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                            elevation = CardDefaults.cardElevation(1.dp)
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(text = name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                                    Text(text = time, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                                Text(text = subj, fontSize = 12.sp, color = EmeraldPrimary)

                                Spacer(modifier = Modifier.height(10.dp))

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.End
                                ) {
                                    if (isApproved) {
                                        Text(text = "Confirmed & Added to Schedule ✅", fontSize = 12.sp, color = SuccessGreen, fontWeight = FontWeight.Bold)
                                    } else {
                                        Button(
                                            onClick = { isApproved = true },
                                            shape = RoundedCornerShape(10.dp),
                                            colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary),
                                            contentPadding = PaddingValues(horizontal = 14.dp, vertical = 6.dp)
                                        ) {
                                            Text("Approve Free Session", fontSize = 12.sp)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Homework Assigner Dialog
    if (showAssignHomeworkDialog) {
        AlertDialog(
            onDismissRequest = { showAssignHomeworkDialog = false },
            title = { Text("Assign Homework to $selectedStudentName") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Enter task for the student to practice before next lesson:")
                    OutlinedTextField(
                        value = homeworkText,
                        onValueChange = { homeworkText = it },
                        modifier = Modifier.fillMaxWidth(),
                        maxLines = 4,
                        shape = RoundedCornerShape(12.dp)
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = { showAssignHomeworkDialog = false },
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary)
                ) {
                    Text("Save & Notify Student")
                }
            },
            dismissButton = {
                TextButton(onClick = { showAssignHomeworkDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}
