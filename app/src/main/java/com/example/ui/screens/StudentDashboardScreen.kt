package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.UserRole
import com.example.data.repository.QuranData
import com.example.ui.MainViewModel
import com.example.ui.components.FreeBadge
import com.example.ui.components.SectionHeader
import com.example.ui.theme.*

@Composable
fun StudentDashboardScreen(
    viewModel: MainViewModel,
    onNavigate: (String) -> Unit
) {
    val profile by viewModel.userProfile.collectAsState()
    val bookings by viewModel.bookings.collectAsState()
    val nextClass = bookings.firstOrNull { it.status == "UPCOMING" }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 80.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Welcome Header & Quick Role Switcher
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(18.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "Assalamu Alaikum",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(text = "✨", fontSize = 14.sp)
                            }
                            Text(
                                text = profile.name,
                                style = MaterialTheme.typography.headlineSmall,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }

                        // Role Tag
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = EmeraldContainer,
                            modifier = Modifier.clickable { onNavigate("settings") }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.School,
                                    contentDescription = null,
                                    tint = EmeraldPrimary,
                                    modifier = Modifier.size(16.dp)
                                )
                                Text(
                                    text = profile.role.name,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = OnEmeraldContainer
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Progress Metrics Row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        MetricPill(
                            label = "Daily Streak",
                            value = "${profile.streakDays} Days 🔥",
                            color = AccentAmber,
                            modifier = Modifier.weight(1f)
                        )
                        MetricPill(
                            label = "Stars Earned",
                            value = "${profile.starsEarned} ⭐",
                            color = GoldSecondary,
                            modifier = Modifier.weight(1f)
                        )
                        MetricPill(
                            label = "Today's Goal",
                            value = "${profile.dailyGoalMinutes}m 🎯",
                            color = EmeraldPrimary,
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        // Upcoming Live Class Card
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("student_next_class_card"),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = EmeraldPrimary)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(10.dp)
                                    .clip(CircleShape)
                                    .background(Color(0xFF69F0AE))
                            )
                            Text(
                                text = "NEXT LIVE CLASS",
                                color = Color.White.copy(alpha = 0.9f),
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 1.sp
                            )
                        }
                        FreeBadge()
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    if (nextClass != null) {
                        Text(
                            text = nextClass.subject,
                            color = Color.White,
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "With ${nextClass.teacherName} • ${nextClass.date} at ${nextClass.timeSlot}",
                            color = GoldLight,
                            fontSize = 13.sp
                        )

                        Spacer(modifier = Modifier.height(14.dp))

                        Button(
                            onClick = { onNavigate("classroom") },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = GoldSecondary,
                                contentColor = Color.White
                            ),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("join_live_classroom_btn")
                        ) {
                            Icon(
                                imageVector = Icons.Default.VideoCameraFront,
                                contentDescription = null,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Enter Live Classroom",
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp
                            )
                        }
                    } else {
                        Text(
                            text = "No Live Class Scheduled",
                            color = Color.White,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "Book a 1-on-1 free trial session with a qualified Al-Azhar / Madinah certified tutor.",
                            color = Color.White.copy(alpha = 0.85f),
                            fontSize = 13.sp
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = { onNavigate("teachers") },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color.White,
                                contentColor = EmeraldPrimary
                            ),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier.fillMaxWidth().testTag("book_trial_now_btn")
                        ) {
                            Text(text = "Book Free Trial Class", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }

        // Quick Actions Grid (8 major features)
        item {
            SectionHeader(
                title = "Quran Learning Areas",
                subtitle = "Select an interactive study module"
            )

            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ActionTile(
                        title = "Noorani Qaida",
                        subtitle = "Alphabet & Harakat",
                        icon = Icons.Default.MenuBook,
                        color = EmeraldPrimary,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("qaida") }
                    )
                    ActionTile(
                        title = "Quran Reader",
                        subtitle = "Surahs & Recitation",
                        icon = Icons.Default.AutoStories,
                        color = TealTertiary,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("quran") }
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ActionTile(
                        title = "Tajweed Rules",
                        subtitle = "Makharij & Noon Saakin",
                        icon = Icons.Default.Spellcheck,
                        color = GoldDark,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("tajweed") }
                    )
                    ActionTile(
                        title = "Hifz Tracker",
                        subtitle = "Ayah Repetition Loop",
                        icon = Icons.Default.Memory,
                        color = EmeraldDark,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("hifz") }
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ActionTile(
                        title = "Find Teacher",
                        subtitle = "Free 1-on-1 Mentors",
                        icon = Icons.Default.PersonSearch,
                        color = SoftBlue,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("teachers") }
                    )
                    ActionTile(
                        title = "AI Quran Tutor",
                        subtitle = "Pronunciation & Rules",
                        icon = Icons.Default.Psychology,
                        color = EmeraldLight,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("ai_tutor") }
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    ActionTile(
                        title = "Islamic Tools",
                        subtitle = "Tasbeeh & Prayer Times",
                        icon = Icons.Default.AccessTime,
                        color = GoldSecondary,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("tools") }
                    )
                    ActionTile(
                        title = "My Classes",
                        subtitle = "History & Homework",
                        icon = Icons.Default.EventNote,
                        color = TealTertiary,
                        modifier = Modifier.weight(1f),
                        onClick = { onNavigate("classes") }
                    )
                }
            }
        }

        // Continue Learning Card
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onNavigate("qaida") }
                    .testTag("continue_learning_card"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .clip(CircleShape)
                            .background(EmeraldContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "ح",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            color = EmeraldPrimary
                        )
                    }

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "CONTINUE RECENT LESSON",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = EmeraldPrimary
                        )
                        Text(
                            text = "Lesson 1: Individual Letters (Makharij)",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        LinearProgressIndicator(
                            progress = { 0.65f },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(6.dp)
                                .clip(RoundedCornerShape(3.dp)),
                            color = EmeraldPrimary,
                            trackColor = EmeraldContainer
                        )
                    }

                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = "Resume",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        // Daily Hadith Reflection
        item {
            val hadithPair = QuranData.hadiths.first()
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = GoldContainer.copy(alpha = 0.6f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.FormatQuote,
                            contentDescription = null,
                            tint = GoldDark,
                            modifier = Modifier.size(18.dp)
                        )
                        Text(
                            text = "HADITH OF THE DAY",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = OnGoldContainer
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = hadithPair.first,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = OnGoldContainer,
                        lineHeight = 26.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = hadithPair.second,
                        fontSize = 13.sp,
                        color = OnGoldContainer.copy(alpha = 0.85f)
                    )
                }
            }
        }
    }
}

@Composable
private fun MetricPill(
    label: String,
    value: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        color = color.copy(alpha = 0.12f)
    ) {
        Column(
            modifier = Modifier.padding(vertical = 10.dp, horizontal = 8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = value,
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                color = color
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = label,
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
private fun ActionTile(
    title: String,
    subtitle: String,
    icon: ImageVector,
    color: Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .clickable(onClick = onClick)
            .testTag("action_tile_${title.lowercase().replace(" ", "_")}"),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .background(color.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = title,
                    tint = color,
                    modifier = Modifier.size(22.dp)
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                fontSize = 11.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}
